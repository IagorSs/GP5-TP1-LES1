import prisma from "../../prisma.js";

class Controller {
  constructor(colletion) {
    this.colletion = colletion;
    this.client = prisma[colletion];
  }

  //Use to find one element on database
  async GetOne(data) {
    let clientData = { data: "", error: "" };
    try {
      clientData.data = await this.client.findUnique({
        ...data,
      });
      clientData.error = false;
    } catch (error) {
      clientData.data = error;
      clientData.error = true;
    }

    return clientData;
  }

  // To include a new element
  async Create(data) {
    let clientData = { data: "", error: "" };
    try {
      clientData.data = await this.client.create({
        ...data,
      });
      clientData.error = false;
    } catch (error) {
      clientData.data = error;
      clientData.error = true;
    }
    console.log(clientData);
    return clientData;
  }

  // To update a exist element
  async Update(data) {
    let clientData = { data: "", error: "" };
    try {
      clientData.data = await this.client.update({
        ...data,
      });
      clientData.error = false;
    } catch (error) {
      clientData.data = error;
      clientData.error = true;
    }
    //console.log({ ...clientData });
    return clientData;
  }

  // To delete one element
  async Delete(data) {
    let clientData = { data: "", error: "" };
    try {
      clientData.data = await this.client.delete({
        ...data,
      });
      clientData.error = false;
    } catch (error) {
      clientData.data = error;
      clientData.error = true;
    }

    return clientData;
  }

  // Search a element
  async Find(data) {
    let clientData = { data: "", error: "" };
    try {
      clientData.data = await this.client.findFirst({
        ...data,
      });
      clientData.error = false;
    } catch (error) {
      clientData.data = error;
      clientData.error = true;
    }

    return clientData;
  }

  // Get an array of elements
  async GetMany(data) {
    let clientData = { data: "", error: "" };
    try {
      clientData.data = await this.client.findMany({
        ...data,
      });
      clientData.error = false;
    } catch (error) {
      clientData.data = error;
      clientData.error = true;
    }
    //console.log(clientData);
    return clientData;
  }
}

export default Controller;
