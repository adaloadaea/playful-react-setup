
const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const { propertyValidation, idValidation, propertyUpdateValidation } = require("../middleware/propertyValidate");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");

/**
 * Routes pour les propriétés
 * Définit les endpoints de l'API pour la gestion des propriétés
 */

/**
 * @route GET /api/properties
 * @desc Récupérer toutes les propriétés
 * @access Public
 */
router.get("/", propertyController.getAllProperties);

/**
 * @route GET /api/properties/:id
 * @desc Récupérer une propriété par son ID
 * @access Public
 */
router.get("/:id", idValidation, propertyController.getPropertyById);

/**
 * @route POST /api/properties
 * @desc Créer une nouvelle propriété avec upload d'image
 * @access Private - Nécessite une authentification
 */
router.post(
  "/", 
  isAuthenticated, 
  upload.single('image'),
  propertyValidation, 
  propertyController.createProperty
);

/**
 * @route PUT /api/properties/:id
 * @desc Mettre à jour une propriété existante avec possibilité de changer l'image
 * @access Private - Nécessite une authentification
 */
router.put(
  "/:id", 
  isAuthenticated,
  idValidation,
  upload.single('image'),
  propertyUpdateValidation, 
  propertyController.updateProperty
);

/**
 * @route DELETE /api/properties/:id
 * @desc Supprimer une propriété
 * @access Private - Nécessite une authentification et des droits d'administrateur
 */
router.delete(
  "/:id", 
  isAuthenticated, 
  isAdmin, 
  idValidation, 
  propertyController.deleteProperty
);

module.exports = router;
