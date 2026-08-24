import { getAuth, clerkClient } from "@clerk/express";

export async function requireClientAuth(req, res, next) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Neautorizat.",
    });
  }

  const user = await clerkClient.users.getUser(userId);
  const role = user.publicMetadata?.role;

  if (role !== "client") {
    return res.status(403).json({
      success: false,
      message: "Acces interzis.",
    });
  }

  req.client = {
    id: userId,
    email: user.emailAddresses?.[0]?.emailAddress,
  };

  return next();
}
