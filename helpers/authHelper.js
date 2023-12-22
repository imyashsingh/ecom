import bcrypt from 'bcrypt';

// creating hashed password
export const hashPassword= async (password)=>{
    try {
        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log("ERROR IN BCRYPT",error);
    }
};

//comparing hashed password
export const comparePassword = async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
};