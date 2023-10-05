class MobilePhone {
    constructor({
      name,
      brand,
      operational_system,
      screen,
      processor,
      memory,
      camera,
      battery,
      connectivity,
      value,
      dimensions,
      _3dmodel,
    }) {
      this.name = name;
      this.brand = brand;
      this.operational_system = operational_system;
      this.screen = screen;
      this.processor = processor;
      this.memory = memory;
      this.camera = camera;
      this.battery = battery;
      this.connectivity = connectivity;
      this.value = value;
      this.dimensions = dimensions;
      this._3dmodel = _3dmodel;
  
      // Concatena nomes com arrays
      this.screen.size = this.screen.size;
      this.screen.resolution = this.screen.resolution;
      this.screen.technology = this.screen.technology;
  
      this.memory.ram = this.memory.ram;
      this.memory.storage = this.memory.storage;
  
      this.camera.front_amount = this.camera.front_amount;
      this.camera.front_megapixel = this.camera.front_megapixel;
      this.camera.rear_amount = this.camera.rear_amount;
      this.camera.rear_megapixel = this.camera.rear_megapixel;
  
      this.dimensions.height = this.dimensions.height;
      this.dimensions.width = this.dimensions.width;
      this.dimensions.thickness = this.dimensions.thickness;
  
      // Verifica se a dimensão é maior que um e divide por 100
      if (this.dimensions.height > 1) {
        this.dimensions.height /= 100;
      }
  
      if (this.dimensions.width > 1) {
        this.dimensions.width /= 100;
      }
  
      if (this.dimensions.thickness > 1) {
        this.dimensions.thickness /= 100;
      }
    }
  }
  
  module.exports = MobilePhone;
  