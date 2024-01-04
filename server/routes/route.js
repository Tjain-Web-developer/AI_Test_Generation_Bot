import express from "express";
import upload from "../utils/multer/multerSetup.js";
import extractInformation from "../utils/pdfExtractor.js";
import Document from "../models/Document.js";
import { insertRecords } from "../utils/pinecone.js";
import { getQuiz } from "../utils/genEmbeddings.js";
import { trim_and_remove_blank_lines } from "../utils/removeExtraLines.js";

const router = express.Router();

const maxLength = 5;

router.post(
    "/upload",
    upload.array("pdfFiles", maxLength),
    async (req, res) => {
        try {
            let records = [];
            let newData = [];
            const files = req.files;

            if (!files || files.length === 0) {
                return res.status(400).json({ error: "No files uploaded." });
            }
            // Process the uploaded files (you can add your logic here)
            for (const file of files) {
                let info = await extractInformation(file.path);
                info.text = trim_and_remove_blank_lines(info.text);
                let createdData = await Document.create({
                    name: file.originalname,
                    embedding: info.embed,
                    text: info.text
                });

                newData.unshift(createdData);

                let obj = {
                    id: createdData.name,
                    values: createdData.embedding,
                };
                records.push(obj);
            }

            // Move the insertRecords outside the forEach loop
            await insertRecords(records);

            res.status(200).json({ success: true, data: newData });
        } catch (error) {
            console.log(error);
            res.status(error.status).json({ error: error.message });
        }
    }
);

router.get('/allfiles', async (req, res) => {
    try {
        const files = await Document.find().sort({_id: -1});
        res.status(200).json({ success: true, data: files });
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }

});

router.get('/genquiz/:id', async (req, res) => {
    try {
        const fileData = await Document.findById(req.params.id);
        if(!fileData) return res.status(404).json({success: false, message: 'Something Went Wrong'});

        const result = await getQuiz(fileData.text);
        if(!result) return res.status(404).json({success: false, message: 'Something Went Wrong'});

        let data = {
            questions: result,
            file: fileData
        }
        res.status(200).json({success: true, data: data});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
})
export default router;
