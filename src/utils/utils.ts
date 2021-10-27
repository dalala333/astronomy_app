import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from './firebase';

export const getFirestoreDB = async (collectionName: string) => {
  const resultCol = collection(db, collectionName);
  const resultSnapshot = await getDocs(resultCol);
  const resultList = resultSnapshot.docs.map((doc: any) => doc.data());
  return resultList;
};

export interface IDataType {
  id?: string;
  image: string;
  title: string;
  description: string;
}

export interface IRoute {
  key: string;
  name: string;
  params: any;
  path: any;
}

export const convertCategoryName = (name: string) => {
  switch (name) {
    case 'astrology':
      return 'Astrology';
    case 'aurora':
      return 'Aurora';
    case 'binarystar':
      return 'Binary Star';
    case 'blackhole':
      return 'Black Hole';
    case 'darkmatter':
      return 'Dark Matter';
    case 'dwarf':
      return 'Dwarf';
    case 'eclipse':
      return 'Eclipse';
    case 'galaxy':
      return 'Galaxy';
    case 'meteor':
      return 'Meteor';
    case 'meteorite':
      return 'Meteorite';
    case 'planet':
      return 'Planet';
  }
};
