

export const webhook = async (req, res) => {
  try {
    console.log(res.data);

    return res.status(200).send({ message: 'ok' });
  }	catch (err) {
		console.log("Error in create customer controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};