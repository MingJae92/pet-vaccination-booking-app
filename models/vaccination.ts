import mongoose, { Document, Schema } from 'mongoose';

export interface IVaccination extends Document {
  id: string;
  petName: string;
  vaccinationType: string;
  lastCompletedDate: Date;
  dueDate: Date;
}

const VaccinationSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    petName: { type: String, required: true },
    vaccinationType: {
      type: String,
      enum: ['Rabies', 'Distemper', 'Parvovirus', 'Bordetella', 'Leptospirosis'],
      required: true,
    },
    lastCompletedDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Vaccination ||
  mongoose.model<IVaccination>('Vaccination', VaccinationSchema);
