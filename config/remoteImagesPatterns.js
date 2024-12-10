const remoteImagesPatterns = [
  {
    protocol: 'https',
    hostname: 'abc-transitionbascarbone.fr',
    port: '',
    pathname: '/wp-content/uploads/**',
  },
  {
    protocol: 'https',
    hostname: 'upload.wikimedia.org',
    port: '',
    pathname: '/wikipedia/commons/**',
  },
  {
    protocol: 'https',
    hostname: 'user-images.githubusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'github.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'cdn.jsdelivr.net',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'nosgestesclimat-dev.s3.fr-par.scw.cloud',
    port: '',
    pathname: '/cms/**',
  },
]

module.exports = remoteImagesPatterns
