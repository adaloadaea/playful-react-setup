
const Property = require("../models/propertyModel");
const { validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');

/**
 * Contrôleur pour la gestion des propriétés
 * Contient toutes les méthodes pour interagir avec les propriétés dans l'API
 */

/**
 * Récupère toutes les propriétés
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Object} Réponse JSON avec toutes les propriétés
 */
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.getAll();
    
    // Transforme les URLs des images pour qu'elles soient complètes
    const propertiesWithFullImageUrls = properties.map(property => {
      if (property.image_url && !property.image_url.startsWith('http')) {
        property.image_url = `${req.protocol}://${req.get('host')}/${property.image_url}`;
      }
      return property;
    });
    
    res.json({ success: true, data: propertiesWithFullImageUrls });
  } catch (error) {
    console.error("Erreur dans getAllProperties:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erreur lors de la récupération des propriétés",
      error: error.message
    });
  }
};

/**
 * Récupère une propriété par son ID
 * @param {Object} req - Objet requête Express avec l'ID en paramètre
 * @param {Object} res - Objet réponse Express
 * @returns {Object} Réponse JSON avec les détails de la propriété
 */
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.getById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ 
        success: false, 
        message: "Propriété non trouvée" 
      });
    }
    
    // Transformer l'URL de l'image pour qu'elle soit complète
    if (property.image_url && !property.image_url.startsWith('http')) {
      property.image_url = `${req.protocol}://${req.get('host')}/${property.image_url}`;
    }
    
    res.json({ success: true, data: property });
  } catch (error) {
    console.error("Erreur dans getPropertyById:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erreur lors de la récupération de la propriété",
      error: error.message
    });
  }
};

/**
 * Crée une nouvelle propriété
 * @param {Object} req - Objet requête Express avec les données de la propriété et le fichier image
 * @param {Object} res - Objet réponse Express
 * @returns {Object} Réponse JSON avec l'ID de la propriété créée
 */
exports.createProperty = async (req, res) => {
  // Validation des données d'entrée
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si une image a été téléchargée, la supprimer car la validation a échoué
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    // Génération d'un identifiant unique si non fourni
    const propertyId = req.body.id || 'prop_' + Date.now();
    
    // Traitement du fichier image téléchargé
    let imageUrl = req.body.image_url;
    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`;
    }
    
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Une image est requise pour la propriété"
      });
    }
    
    // Préparation des données de la propriété avec l'URL de l'image
    const propertyData = {
      ...req.body,
      id: propertyId,
      image_url: imageUrl
    };
    
    const createdPropertyId = await Property.create(propertyData);
    
    res.status(201).json({ 
      success: true, 
      message: "Propriété créée avec succès", 
      data: { 
        id: createdPropertyId,
        image_url: `${req.protocol}://${req.get('host')}/${imageUrl}`
      }
    });
  } catch (error) {
    console.error("Erreur dans createProperty:", error);
    // Si une image a été téléchargée, la supprimer en cas d'erreur
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ 
      success: false, 
      message: "Erreur lors de la création de la propriété",
      error: error.message
    });
  }
};

/**
 * Met à jour une propriété existante
 * @param {Object} req - Objet requête Express avec l'ID et les données à mettre à jour
 * @param {Object} res - Objet réponse Express
 * @returns {Object} Réponse JSON confirmant la mise à jour
 */
exports.updateProperty = async (req, res) => {
  // Validation des données d'entrée
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si une image a été téléchargée, la supprimer car la validation a échoué
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    // Récupérer la propriété existante pour vérifier si elle existe
    const existingProperty = await Property.getById(req.params.id);
    if (!existingProperty) {
      // Si une image a été téléchargée, la supprimer car la propriété n'existe pas
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ 
        success: false, 
        message: `Propriété avec l'ID ${req.params.id} non trouvée` 
      });
    }
    
    // Traitement du fichier image téléchargé
    let imageUrl = req.body.image_url;
    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`;
      
      // Supprimer l'ancienne image si elle existe et n'est pas une URL externe
      if (existingProperty.image_url && 
          !existingProperty.image_url.startsWith('http') && 
          fs.existsSync(path.join(__dirname, '..', existingProperty.image_url))) {
        fs.unlinkSync(path.join(__dirname, '..', existingProperty.image_url));
      }
    }
    
    // Préparation des données de mise à jour avec l'URL de l'image
    const updateData = {
      ...req.body
    };
    
    if (imageUrl) {
      updateData.image_url = imageUrl;
    }
    
    await Property.update(req.params.id, updateData);
    
    // Préparer la réponse
    const responseData = {};
    if (imageUrl) {
      responseData.image_url = `${req.protocol}://${req.get('host')}/${imageUrl}`;
    }
    
    res.json({ 
      success: true, 
      message: "Propriété mise à jour avec succès",
      data: Object.keys(responseData).length ? responseData : undefined
    });
  } catch (error) {
    console.error("Erreur dans updateProperty:", error);
    // Si une image a été téléchargée, la supprimer en cas d'erreur
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    // Si la propriété n'existe pas
    if (error.message.includes("non trouvée")) {
      return res.status(404).json({ 
        success: false, 
        message: error.message 
      });
    }
    
    res.status(400).json({ 
      success: false, 
      message: "Erreur lors de la mise à jour de la propriété",
      error: error.message
    });
  }
};

/**
 * Supprime une propriété
 * @param {Object} req - Objet requête Express avec l'ID de la propriété à supprimer
 * @param {Object} res - Objet réponse Express
 * @returns {Object} Réponse JSON confirmant la suppression
 */
exports.deleteProperty = async (req, res) => {
  try {
    // Récupérer la propriété pour obtenir le chemin de l'image
    const property = await Property.getById(req.params.id);
    if (!property) {
      return res.status(404).json({ 
        success: false, 
        message: `Propriété avec l'ID ${req.params.id} non trouvée` 
      });
    }
    
    // Supprimer la propriété de la base de données
    await Property.delete(req.params.id);
    
    // Supprimer l'image associée si elle existe et n'est pas une URL externe
    if (property.image_url && 
        !property.image_url.startsWith('http') && 
        fs.existsSync(path.join(__dirname, '..', property.image_url))) {
      fs.unlinkSync(path.join(__dirname, '..', property.image_url));
    }
    
    res.json({ 
      success: true, 
      message: "Propriété supprimée avec succès" 
    });
  } catch (error) {
    console.error("Erreur dans deleteProperty:", error);
    
    // Si la propriété n'existe pas
    if (error.message.includes("non trouvée")) {
      return res.status(404).json({ 
        success: false, 
        message: error.message 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Erreur lors de la suppression de la propriété",
      error: error.message
    });
  }
};
