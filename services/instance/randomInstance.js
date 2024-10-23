import * as Instance from "../../models/instance.js";

export default async function randomInstance() {
  const instances = await Instance.get();
  const randomIndex = Math.floor(Math.random() * instances.length);
  const randomPhone = instances[randomIndex].buyer_phone;

  return randomPhone
};
