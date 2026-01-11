import Image from 'next/image';
import './download.scss';

const File_Url = '/Eterball.png';

const download = () => {
  return (
    <main id="download-hero">
      <div id="title">
        <h1>
          Eterball{' '}
          <span>
            <Image src="/Logo(2).png" alt="Logo" height={100} width={100} />
          </span>
        </h1>
      </div>
      <div id="button_download">
        <a href={File_Url} download>
          <button id="download">
            Télécharger le jeu{' '}
            <span id="icone">
              <Image
                src={'/icons8-windows.png'}
                alt="icône windows"
                height={25}
                width={25}
              />
            </span>
          </button>
        </a>
      </div>
      <div id="system">
        <a href={File_Url} download>
          <Image
            src={'/icons8-linux-50.png'}
            alt="Linux"
            width={40}
            height={40}
          />
        </a>
        <a href={File_Url} download>
          <Image src={'/icons8-mac-50.png'} alt="Mac" width={40} height={40} />
        </a>
        <a href={File_Url} download>
          <Image
            src={'/icons8-windows.png'}
            alt="Windows"
            width={40}
            height={40}
          />
        </a>
      </div>
    </main>
  );
};
export default download;
