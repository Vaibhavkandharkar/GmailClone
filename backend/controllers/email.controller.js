import { Email } from "../models/email.model.js";

export const createEmail = async (req, res) => {
    try {
        const userId = req.user?.id; // Ensure req.user exists
        const { to, subject, message } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const email = await Email.create({
            to,
            subject,
            message,
            userId
        });

        return res.status(201).json({
            message: "Email created successfully",
            success: true,
            email
        });

    } catch (error) {
        console.error("Error in createEmail:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const deleteEmail = async (req, res) => {
    try {
        const emailId = req.params.id;

        if (!emailId) return res.status(400).json({ message: "Email id is required", success: false });

        const email = await Email.findByIdAndDelete({ _id: emailId });

        if (!email) {
            return res.status(404).json({ message: "Email id not found", success: false });
        }

        return res.status(200).json({
            message: "Email deleted successfully",
            success: true
        });

    } catch (error) {
        console.error("Error in deleteEmail:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAllEmailById = async (req,res) => {
   try{
      const userId = req.id;

      const emails =  await Email.find({userId});
      
      return res.status(200).json({emails})
   } catch (error) {
     console.log(error);
   }
}
