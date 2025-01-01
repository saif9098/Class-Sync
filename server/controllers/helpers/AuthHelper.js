import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword, (err, isMatch) => {
    if (err) {
      console.error('Error during comparison:', err);
    } else if (isMatch) {
      console.log('Password matches!');
    } else {
      console.log('Password does not match.',password);
    }
});}