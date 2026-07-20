import dotenv from 'dotenv';
dotenv.config();
if(!process.env.MONGO_URI)
{
    throw new Error("MONGO_URI is not defined in environment variables");
    
}

if(!process.env.JWT_SECRET)
{
    throw new Error("JWT_SECRET is not defined in environment variables");
    
}
if(!process.env.GOOGLE_CLIENT_ID)
{
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables");
    
}
if(!process.env.GOOGLE_CLIENT_SECRET)
{
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables");
    
}
if(!process.env.GOOGLE_REFRESH_TOKEN)
{
    throw new Error("GOOGLE_REFRESH_TOKEN is not defined in environment variables");
    
}
if(!process.env.GOOGLE_USER)
{
    throw new Error("GOOGLE_USER is not defined in environment variables");
    
}
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log
const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET
}
export default config;