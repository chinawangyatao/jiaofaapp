<script>
	import {
		urls
	} from '@/config/UrlKey.js'
	export default {
		
		data() {
			return {
				res: {
					version: '',
					tip: '当前版本为最新版本，暂无其他版本！',
					btn: '请更新最新版本',
					judge: true,
					versionCode: ''
				}
			}
		},
		onLaunch() {
			//#ifndef H5
			//#endif
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './colorui/color-style.scss';

	@font-face {
		font-family: 'Bebasneue';
		src: url('~@/static/famiy/BEBASNEUE-REGULAR.TTF') format('truetype');
	}

	@font-face {
		font-family: 'pingfangMedium';
		src: url('~@/static/famiy/PINGFANG+MEDIUM.TTF') format('truetype');
	}

	@font-face {
		font-family: 'pingfangMediumBold';
		src: url('~@/static/famiy/PINGFANG+BOLD.TTF') format('truetype');
	}

	* {
		padding: 0;
		margin: 0;
		font-family: 'pingfangMedium';
	}
	.field{
		display: flex;
		background: #ffffff;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
	}
</style>
