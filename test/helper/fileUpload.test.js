import { fileUpload } from '../../src/helper/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'das0cahaf',
  api_key: '235587912136464',
  api_secret: 'tFq7lVC46STYjq9molZqexIMm9Y',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  test('debe subir el archivo correctamente a cloudinary', async () => {
    const imageUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWOnkCZ4Ad7U7J9UK5e8ohpBvkxKLUSpgtNg&usqp=CAU';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imgId = segments[segments.length - 1].replace('.jpg', '');
    const cloudResp = await cloudinary.api.delete_resources(['journal/' + imgId], {
      resource_type: 'image',
    });
    console.log(cloudResp);
  });

  test('debe retornar null', async () => {
    const file = new File([], 'foto.jpg');

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
