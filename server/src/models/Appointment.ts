import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      doctorInfo: {
        type: String,
        required: true,
      },
      userInfo: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },   
      time: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "pending",
      }
    },
    { timestamps: true }
  );

  type Appointment = mongoose.InferSchemaType<typeof appointmentSchema>
  
  export default mongoose.model<Appointment>("appointments", appointmentSchema);