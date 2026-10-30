import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn(
        "Admin credentials not found in .env file. Skipping admin seeding."
      );
      return;
    }

    const adminExists = await Admin.findOne({ email: adminEmail });

    if (adminExists) {
      return;
    }

    await Admin.create({
      email: adminEmail,
      password: adminPassword,
    });

    console.log("Admin account created successfully from .env credentials");
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

export default seedAdmin;