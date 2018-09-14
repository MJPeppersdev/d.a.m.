import appIcon from '../../../resources/icons/512x512.png';
import { IS_DEV } from '../../constants';
import openAboutWindow from 'about-window';

export const aboutMenuItem = {
    label: 'About Desktop Android Messages',
    click: () => {
        openAboutWindow({
            icon_path: appIcon,
            copyright: 'Copyright © 2018 Michael J Peppers, All rights reserved.',
            product_name: 'Desktop Android Messages',
            open_devtools: IS_DEV
        });
    }
};
