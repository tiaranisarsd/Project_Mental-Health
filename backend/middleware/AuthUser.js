import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyUser = async (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda" });
    }

    const response = await prisma.users.findUnique({
        where: {
            id: Number(req.session.userId)
        }
    });

    if (!response) return res.status(404).json({ msg: "User not found" });

    req.userId = response.id;
    req.role = response.role;
    next();
};

export const adminOnly = async (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda" });
    }

    const response = await prisma.users.findUnique({
        where: {
            id: Number(req.session.userId)
        }
    });

    if (!response) return res.status(404).json({ msg: "User not found" });
    if (response.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });

    next();
};
