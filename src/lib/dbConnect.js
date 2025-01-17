import mongoose from "mongoose";

const dbConnect = async () => {
  return mongoose.connect(`mongodb+srv://bhambidsatyam1:vscodeExtentionAdmin@vscodeextentioncluster.2hlna.mongodb.net/?retryWrites=true&w=majority&appName=vscodeExtentionCluster`);
};

export default dbConnect;
