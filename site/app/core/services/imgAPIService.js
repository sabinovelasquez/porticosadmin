export default ngModule => {
  ngModule.service('imgAPIService', () => {
    this.imgs = ['img1', 'img2'];
    this.url = 'www.sabino.cl';
    const service = {
      GetImg: (key) => {
        return `${this.url}/${this.imgs[key]}`;
      },
    };
    return service;
  });
};
