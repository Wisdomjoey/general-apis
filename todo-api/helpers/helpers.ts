import bcrypt from "bcryptjs";

export const generateHash = async (data: string) => {
	const salt = await bcrypt.genSalt(12);

	return await bcrypt.hash(data, salt);
};

export const validateHash = async (hash: string, data: string) => {
	return await bcrypt.compare(data, hash);
};
