import Room from "../models/room.js";
import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";



//API to create a new room for a hotel
export const createRoom = async(req, res)=>{
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner:req.userId})
        if(!hotel){return res.json({success:false, message:"No hotel found"})}

        // upload images to cloudinary 
            const uploadImages = req.files.map(async(file)=>{
                const response = await cloudinary.uploader.upload(file.path);
                return response.secure_url;

            })
            const images = await Promise.all(uploadImages);
            await Room.create({
                hotel: hotel._id,
                roomType,
                pricePerNight: +pricePerNight,
                amenities: JSON.parse(amenities),
                images,
            })
            res.json({ success:true, message:"room created successfully"})
    } catch (error) {
        res.json({success:false, message: error.message})
        
    }

}

// API to get all rooms
export const getRooms = async(req, res)=>{
    try {
        const rooms = await Room.find({isAvailable:true}).populate({
            path: 'hotel',
            populate: {
                path :'owner',
                select: 'image',
            },
        }).sort({createdAt: -1});
        res.json({success:true, rooms});
        
    } catch (error) {
        res.json({success:false, message:error.message});
        
    }

};


// API to get all rooms for a specific hotel
export const getOwnerRooms = async(req, res)=>{
    try {
       const hotelData= await Hotel.findOne({owner: req.userId})
        
    //    const hotelData= await Hotel.findOne({owner:req.auth.userId})
       const rooms =await Room.find({hotel:hotelData._id.toString()}).populate("hotel");
       res.json({success:true, rooms})
        
    } catch (error) {
       res.json({success:false, message: error.message})
        
    }

}


// API to toggle  availability of a room
export const toggleRoomAvailability = async(req, res)=>{
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success:true, message:"Room availability updated"});
        
    } catch (error) {
       res.json({success:false, message: error.message})
    }

}


// export const toggleRoomAvailability = async (req, res) => {
//   try {
//     console.log("🛰️  toggle hit:", { body: req.body, userId: req.userId });

//     const { roomId } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(roomId)) {
//       return res.status(400).json({ success: false, message: "Invalid roomId" });
//     }

//     const room = await Room.findById(roomId);
//     if (!room) {
//       return res.status(404).json({ success: false, message: "Room not found" });
//     }

//     room.isAvailable = !room.isAvailable;
//     await room.save();

//     return res.json({
//       success: true,
//       message: "Room availability updated",
//       isAvailable: room.isAvailable,
//       roomId: room._id,
//     });
//   } catch (e) {
//     console.error("❌ toggle error:", e);
//     return res.status(500).json({ success: false, message: e.message });
//   }
// };








// export const toggleRoomAvailability = async (req, res) => {
//   try {
//     const { roomId } = req.body;

//     // 1) 校验 roomId 是否为合法的 Mongo ObjectId，避免 CastError
//     if (!mongoose.Types.ObjectId.isValid(roomId)) {
//       return res.status(400).json({ success: false, message: "Invalid roomId" });
//     }

//     // 2) 查询
//     const room = await Room.findById(roomId).populate({ path: "hotel", select: "owner" });
//     if (!room) {
//       return res.status(404).json({ success: false, message: "Room not found" });
//     }

//     // 3)（可选但推荐）权限校验：确保当前用户是该房间所属酒店的 owner
//     // 你的鉴权中已经把 userId 塞到 req.userId（或 req.auth().userId）
//     // if (String(room.hotel.owner) !== String(req.userId)) {
//     //   return res.status(403).json({ success: false, message: "Forbidden" });
//     // }

//     // 4) 业务逻辑
//     room.isAvailable = !room.isAvailable;
//     await room.save();

//     return res.json({
//       success: true,
//       message: "Room availability updated",
//       roomId: room._id,
//       isAvailable: room.isAvailable,
//     });
//   } catch (error) {
//     console.error("toggleRoomAvailability error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };