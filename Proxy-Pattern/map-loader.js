// 地图数据接口
class MapDataInterface {
    loadRegionData() {
        throw new Error('Method loadRegionData() must be implemented');
    }
}

// 真实地图数据类
class RealMapData extends MapDataInterface {
    constructor(regionId) {
        super();
        this.regionId = regionId;
        this.data = null;
        this.isLoading = false;
    }

    async loadRegionData() {
        if (this.data) {
            return this.data;
        }

        if (!this.isLoading) {
            this.isLoading = true;
            try {
                // 模拟从服务器获取地图数据
                this.data = await this.fetchRegionData();
                return this.data;
            } catch (error) {
                console.error(`Failed to load region data: ${error}`);
                throw error;
            } finally {
                this.isLoading = false;
            }
        }
    }

    async fetchRegionData() {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            id: this.regionId,
            name: `Region ${this.regionId}`,
            coordinates: [/* 地理坐标数据 */],
            properties: {
                population: Math.floor(Math.random() * 1000000),
                area: Math.floor(Math.random() * 10000)
            }
        };
    }
}

// 地图数据代理类
class ProxyMapData extends MapDataInterface {
    constructor() {
        super();
        this.regions = new Map(); // 缓存不同区域的数据
        this.loadingQueue = new Set(); // 正在加载的区域队列
    }

    async loadRegionData(regionId) {
        // 检查是否已缓存
        if (this.regions.has(regionId)) {
            console.log(`Using cached data for region ${regionId}`);
            return this.regions.get(regionId);
        }

        // 检查是否正在加载
        if (this.loadingQueue.has(regionId)) {
            console.log(`Region ${regionId} is already loading`);
            return this.waitForRegionLoad(regionId);
        }

        // 开始新的加载
        this.loadingQueue.add(regionId);
        try {
            const realMapData = new RealMapData(regionId);
            const data = await realMapData.loadRegionData();
            this.regions.set(regionId, data);
            return data;
        } finally {
            this.loadingQueue.delete(regionId);
        }
    }

    async waitForRegionLoad(regionId) {
        // 等待区域数据加载完成
        return new Promise(resolve => {
            const checkInterval = setInterval(() => {
                if (this.regions.has(regionId)) {
                    clearInterval(checkInterval);
                    resolve(this.regions.get(regionId));
                }
            }, 100);
        });
    }

    clearCache(regionId) {
        if (regionId) {
            this.regions.delete(regionId);
        } else {
            this.regions.clear();
        }
    }
}

// 使用示例
const mapDataProxy = new ProxyMapData();

// 地图渲染管理器
class MapRenderer {
    constructor(proxy) {
        this.proxy = proxy;
        this.activeRegions = new Set();
    }

    async loadVisibleRegions(visibleRegionIds) {
        const loadPromises = visibleRegionIds.map(async regionId => {
            if (!this.activeRegions.has(regionId)) {
                this.activeRegions.add(regionId);
                try {
                    const regionData = await this.proxy.loadRegionData(regionId);
                    this.renderRegion(regionData);
                } catch (error) {
                    console.error(`Failed to load region ${regionId}:`, error);
                }
            }
        });

        await Promise.all(loadPromises);
    }

    renderRegion(regionData) {
        console.log(`Rendering region: ${regionData.name}`);
        // 实现具体的地图渲染逻辑
    }

    unloadInvisibleRegions(visibleRegionIds) {
        const visibleSet = new Set(visibleRegionIds);
        for (const regionId of this.activeRegions) {
            if (!visibleSet.has(regionId)) {
                this.activeRegions.delete(regionId);
                this.proxy.clearCache(regionId);
            }
        }
    }
}

// 使用示例
const renderer = new MapRenderer(mapDataProxy);

// 模拟视口变化
async function handleViewportChange(visibleRegions) {
    await renderer.loadVisibleRegions(visibleRegions);
    renderer.unloadInvisibleRegions(visibleRegions);
}

// 导出模块
export { ProxyMapData, MapRenderer, handleViewportChange }; 