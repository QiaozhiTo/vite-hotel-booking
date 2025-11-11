import User from '../models/User.js';
import { Webhook } from 'svix';

const clerkWebhooks = async (req, res) =>{
    try{

        console.log('🔔 /api/clerk webhook hit');   // <--- 关键调试点

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const headers = {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        //verify headers
        
        const payload = req.body;   // Buffer

    // ✅ verify 返回的是 event 对象
        const evt = await whook.verify(payload, headers);
        const { data, type } = evt;

        console.log('✅ Clerk webhook event:', type);

        let userData = null;
        if (type === 'user.created' || type === 'user.updated') {
        // 尝试拿 primary email，没有就拿第一个
        const primaryEmailObj =
            data.email_addresses?.find(e => e.id === data.primary_email_address_id) ||
            data.email_addresses?.[0];

        userData = {
            _id: data.id,
            email: primaryEmailObj?.email_address || '',
            username: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            image: data.image_url || '',
        };

        console.log('📦 userData to save:', userData);
        }
        // const userData = {
        //     _id:data.id,
        //     email: data.email_addresses[0].email_address,  // error
        //     username: data.first_name + " " + data.last_name,
        //     image: data.image_url,
        // };
        // switch cases for different events
        switch (type){
            case "user.created":{
                await User.create(userData);
                console.log('💾 user.created saved to Mongo');
                break;
            }
             case "user.updated":{
                // await User.findByIdAndUpdate(data.id, userData);
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log('💾 user.updated saved to Mongo');

                break;

            }
              case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                console.log('💾 user.deleted removed from Mongo');
                break;
            }

            default:
                break;
        }
        res.json({success:true, message:"Webhook Received"});
    } catch (error){
        console.log(error.message);
        res.json({success:false, message:error.message});

    }
}
export default clerkWebhooks;