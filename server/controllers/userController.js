import { messageInRaw } from "svix";

// GET /api/user
export const getUserData = async (req, res) =>{
    try {
        const role = req.user.role;
        // const recentSearchedCities = req.user.recentSearchedCities;
        const rawCities = req.user.recentSearchedCities || [];
        const recentSearchedCities = rawCities
        .filter(c => typeof c === 'string' && c.trim() !== '');

        res.json({success:true, role, recentSearchedCities})

    } catch (error) {
        res.json({success:false, message:error.message})

    }

}

// store user searched cities 
export const storeRecentSearchedCities = async (req, res) =>{
    try {
        // storeRecentSearchedCities are array, storeRecentSearchedCity is the new searched city, don't mix them !!!

        const {recentSearchedCity} = req.body;
        //const {recentSearchedCities} = req.body;❗ ❌

        const user = await req.user ;
        if(user.recentSearchedCities.length < 3){
          //  user.recentSearchedCities.push(recentSearchedCity) ❗ ❌
            user.recentSearchedCities.push(recentSearchedCity)

        } else{
            user.recentSearchedCities.shift()
            user.recentSearchedCities.push(recentSearchedCity)

        }
        await user.save();
        res.json({success:true, message:"City added"})

    } catch (error) {
        res.json({success:false, message:error.message})


    }
}