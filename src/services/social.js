import { SocialCollection } from "../db/models/social.js";

export const getSocial = () => {
  return SocialCollection.find();
};

export const createSocial = async (socialData) => {
  return await SocialCollection.create({
    userId: socialData.userId,
    ...socialData,
  });
};

export const updateSocial = (id, socialData) => {
  return SocialCollection.findByIdAndUpdate(
    { _id: id, userId: socialData.userId },
    socialData,
    {
      new: true,
    },
  );
};

export const deleteSocial = (id, userId) => {
  return SocialCollection.findByIdAndDelete({ _id: id, userId });
};
