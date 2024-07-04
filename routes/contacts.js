const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Route pour créer un nouveau contact
router.post("/", async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour supprimer un contact par son ID
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact == null) {
      return res.status(404).json({ message: "Cannot find contact" });
    }
    await contact.remove();
    res.json({ message: "Deleted contact" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
