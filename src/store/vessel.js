import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
const vessel = defineStore('vesselStore', {
	state: () => {
		return {
			currentVessel: {
				id: 12,
				name: '乌海',
			}, // 当前选择的单条船
			currentVesselList: [1, 2, 2, 2], // 当前选择的船列表（提供给船队状况使用）
			overviewFleet: 'DDDDDD', // 提供给船队状况选择船舶条件使用
		};
	},
	actions: {
		setCurrentVessel(vessel) {
			this.currentVessel = vessel;
		},
		setCurrentVesselList(vessel) {
			this.currentVesselList = vessel;
			document.dispatchEvent(new CustomEvent('changeVesselList'));
		},
		setOverviewFleet(fleet) {
			this.overviewFleet = fleet;
		},
	},
	//开启数据缓存
	persist: {
		storage: sessionStorage,
		enabled: true,
	},
});

export default vessel;
