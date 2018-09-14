const remote = require('electron').remote;

const Menu = remote.Menu;

const standardMenuTemplate = [
  {
    label: 'Copy',
    role: 'copy',
  },
  {
    type: 'separator',
  },
  {
    label: 'Select All',
    role: 'selectall',
  }
];

const textMenuTemplate = [
  {
    label: 'Undo',
    role: 'undo',
  },
  {
    label: 'Redo',
    role: 'redo',
  },
  {
    type: 'separator',
  },
  {
    label: 'Cut',
    role: 'cut',
  },
  {
    label: 'Copy',
    role: 'copy',
  },
  {
    label: 'Paste',
    role: 'paste',
  },
  {
    type: 'separator',
  },
  {
    label: 'Select All',
    role: 'selectall',
  }
];

const standardInputMenu = Menu.buildFromTemplate(standardMenuTemplate);
const textInputMenu = Menu.buildFromTemplate(textMenuTemplate);

const popupContextMenu = (event) => {
  switch (event.target.nodeName) {
    case 'VIDEO':
    case 'IMG':
      if (event.target.src && event.target.src.length) {
        let mediaType = event.target.nodeName === 'IMG' ? 'Image' : 'Video';
        const mediaInputMenu = Menu.buildFromTemplate([{
          label: `Save ${mediaType} As...`,
          click: () => {
            const link = document.createElement('a');
            link.href = event.target.src;
            link.download = event.target.src.replace('blob:https://messages.android.com/', '');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }]);
        mediaInputMenu.popup({
          window: remote.getCurrentWindow(),
          callback: () => {
            mediaInputMenu = null;
          }
        });
      }
      break;
    default:
      if (event.target.isContentEditable) {
        textInputMenu.popup(remote.getCurrentWindow());
      } else { 
        standardInputMenu.popup(remote.getCurrentWindow());
      }
  }
};

module.exports = popupContextMenu;
