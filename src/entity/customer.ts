import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get address(): Address {
    return this._address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set address(address: Address) {
    this._address = address;
  }
}

// ## ENTIDADE RICA
/**
 * Entidades ricas possuem regras de negócio, se auto validam
 * para mantar a consistência de dados.
 * */

// class Customer {
//   _id: string;
//   _name: string;
//   _address: string = "";
//   _active: boolean = false;

//   constructor(id: string, name: string) {
//     this._id = id;
//     this._name = name;
//     this.validate();
//   }

//   validate() {
//     if (this._name.length === 0) {
//       throw new Error("Name is required");
//     }
//     if (this._id.length === 0) {
//       throw new Error("id is required");
//     }
//   }

//   changeName(name: string) {
//     this._name = name;
//     this.validate();
//   }

//   activate() {
//     if (this._address.length === 0) {
//       throw new Error("Addres is mandatory to activate a customer");
//     }
//     this._active = true;
//   }

//   deactivate() {
//     this._active = false;
//   }
// }

// ## ENTIDADE ANÊMICA
/**
 * Entidades anêmicas não possuem regras de negócio,
 * em alguns casos são apenas classe com getters e setters para suprir
 * as necessitas de um ORM ou representar uma tabela no banco de dados
 */

// class Customer {
//   _id: string;
//   _name: string;
//   _address: string;

//   constructor(id: string, name: string, address: string) {
//     this._id = id;
//     this._name = name;
//     this._address = address;
//   }

//   get id(): string {
//     return this._id;
//   }

//   get name(): string {
//     return this._name;
//   }

//   get address(): string {
//     return this._address;
//   }

//   set name(name: string) {
//     this._name = name;
//   }

//   set address(address: string) {
//     this._address = address;
//   }
// }