import  Notification from '../models/Notification.js';

// get Notification
export const getNotification = async (req, res) => {
    try{
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
    }catch(error){
    res.status(500).json({message:'Error'});
    }
};

// mark As Read
export const markAsRead = async (req, res) => {
    try{
        const notifications = await Notification.findById(req.params.id);
        if (!notifications) return res.status(404).json({ message: 'Notification not found' });
        notifications.read = true;
        await notifications.save();
        res.status(200).json(notifications);
    }catch(error){
        res.status(500).json({message:'Error'});
    }
};