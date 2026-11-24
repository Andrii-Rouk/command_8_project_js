const loader = document.querySelector('.loader');

export const showLoader = () => {
  loader.classList.remove('is-hidden');
};

export const hideLoader = () => {
  loader.classList.add('is-hidden');
};

let pendingRequests = 0;

export async function withLoader(request) {
  pendingRequests += 1;
  if (pendingRequests === 1) showLoader();

  try {
    return await request();
  } finally {
    pendingRequests -= 1;
    if (pendingRequests === 0) hideLoader();
  }
}
