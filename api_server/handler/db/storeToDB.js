module.exports = async (Model, data, query) => {
  const dataCheck = await Model.findOne(query);

  if (dataCheck) await Model.findOneAndUpdate({ _id: dataCheck["_id"] }, data);
  else {
    const newData = query ? { ...data, ...query } : { ...data };
    var newModel = new Model(newData);

    newModel.save((err, Model) => {
      if (err) console.log(err);
    });
  }
};
