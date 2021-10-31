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
      return 'Cung Hoàng Đạo';
    case 'aurora':
      return 'Cực Quang';
    case 'binary':
      return 'Sao Đôi';
    case 'blackhole':
      return 'Hố đen';
    case 'darkmatter':
      return 'Vật chất tối';
    case 'dwarfStar':
      return 'Sao lùn';
    case 'eclipse':
      return 'Nguyệt Thực & Nhật Thực';
    case 'galaxy':
      return 'Thiên Hà';
    case 'meteor':
      return 'Sao Băng';
    case 'meteorite':
      return 'Thiên Thạch';
    case 'planet':
      return 'Hệ mặt trời';
  }
};
