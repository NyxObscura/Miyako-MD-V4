import axios from 'axios';

const base = 'https://api.cloudflare.com'

export class subdomain {
    constructor({
        zone,
        token,
        domain
    }) {
        this.zone = zone
        this.token = token
        this.domain = domain
        if (!this.zone) {
            throw new Error("Zone not found");
        }
        if (!this.token) {
            throw new Error("Token not found");
        }
        if (!this.domain) {
            throw new Error("Domain not found");
        }
    }

    async create(host, ip) {
        return new Promise(async (resolve) => {
            axios
                .post(
                    `${base}/client/v4/zones/${this.zone}/dns_records`, {
                        type: "A",
                        name: host.replace(/[^a-z0-9.-]/gi, "") + "." + this.domain,
                        content: ip.replace(/[^0-9.]/gi, ""),
                        ttl: 3600,
                        priority: 10,
                        proxied: true
                    }, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((e) => {
                    let res = e.data;
                    if (res.success) resolve({
                        success: true,
                        zone: res.result?.zone_name,
                        name: res.result?.name,
                        ip: res.result?.content
                    });
                })
                .catch((e) => {
                    let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                    let err1Str = String(err1);
                    resolve({
                        success: false,
                        error: err1Str
                    });
                });
        });
    }

    async list() {
        return new Promise(async (resolve) => {

            try {
                const response = await axios.get(`${base}/client/v4/zones/${this.zone}/dns_records`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                let result = []
                for (let hasil of response.data.result) {
                    result.push({
                        id: hasil.id,
                        zone_id: hasil.zone_id,
                        zone_name: hasil.zone_name,
                        name: hasil.name,
                        type: hasil.type,
                        content: hasil.content,
                        proxiable: hasil.proxiable,
                        proxied: hasil.proxied,
                        ttl: hasil.ttl,
                        locked: hasil.locked
                    })
                }
                resolve({
                    success: true,
                    data: result
                });
            } catch (e) {
                resolve({
                    success: false,
                    error: e
                });
            }
        })
    }

    async delete(dnsRecordId) {
        return new Promise(async (resolve) => {

            try {
                const response = await axios.delete(`${base}/client/v4/zones/${this.zone}/dns_records/${dnsRecordId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                resolve({
                    success: true,
                    data: response.data
                });
            } catch (e) {
                resolve({
                    success: false,
                    error: e
                });
            }
        })
    }

    async detail(dnsRecordId) {
        return new Promise(async (resolve) => {

            try {
                const response = await axios.get(`${base}/client/v4/zones/${this.zone}/dns_records/${dnsRecordId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                resolve({
                    success: true,
                    data: response.data
                });
            } catch (e) {
                resolve({
                    success: false,
                    error: e
                });
            }
        })
    }
}