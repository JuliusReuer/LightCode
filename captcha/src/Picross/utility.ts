class Utility {
  static removeFromArray(array: Array<any>, value: any): Array<any> {
    const index = array.indexOf(value);

    if (index !== -1) {
      array.splice(index, 1);
    }

    return array;
  }

  static getZeroFilledArray(length: number): Array<number> {
    return new Array(length).fill(0);
  }

  static cloneArray(array: Array<any>): Array<any> {
    return array.slice(0);
  }

  static getRandomIntBetween(min: number, max: number): number {
    let minCeil = Math.ceil(min),
      maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
  }
}
