import { Request, Response } from 'express';
import Call from '../models/CallModels'; // Adjust the import path according to your project structure
import sequelize from '../models';

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Database synchronization error:', err);
    });

const getCalls = async (req: Request, res: Response): Promise<void> => {
    try {
        const fetchResult = await Call.findAll();
        res.json(fetchResult);
        console.log(fetchResult);
    } catch (err: any) {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const getCallById = async (req: Request, res: Response): Promise<void> => {
    try {
        const call: Call | null = await Call.findByPk(req.params.id);
        if (call) {
            res.json(call);
        } else {
            res.status(404).json({ error: 'Call not found' });
        }
    } catch (err: any) {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const createCall = async (req: Request, res: Response): Promise<void> => {
    try {
        const call = await Call.create(req.body);
        res.status(201).json(call);
    } catch (err: any) {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const updateCall = async (req: Request, res: Response): Promise<void> => {
    try {
        const [updated] = await Call.update(req.body, {
            where: { CallID: req.params.id }
        });
        if (updated) {
            const updatedCall = await Call.findByPk(req.params.id);
            res.status(200).json(updatedCall);
        } else {
            res.status(404).json({ error: 'Call not found' });
        }
    } catch (err: any) {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const deleteCall = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await Call.destroy({
            where: { CallID: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Call not found' });
        }
    } catch (err: any) {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

export {
    getCalls,
    getCallById,
    createCall,
    updateCall,
    deleteCall
};
 