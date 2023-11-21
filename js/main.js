import { getMocks } from './getting-data.js';
import { renderGallery } from './gallery.js';
import { handlerLaunch } from './form.js';
renderGallery(getMocks(25));
handlerLaunch();
