export class ServerInfo {

    public cpuArr: string[] = [];
    public memArr: string[] = [];
    public netArr: string[] = [];

    public addCpu(perc) {

        if (this.cpuArr.length == 300) {
            this.cpuArr.splice(300,1)
            this.cpuArr.splice(0,1)
        }
        this.cpuArr.push(perc)
    }

    public addMem(perc) {
        if (this.memArr.length == 300) {
            this.memArr.splice(300,1)
            this.memArr.splice(0,1)
        }
        this.memArr.push(perc)
    }

    public addNet(perc) {
        if (this.netArr.length == 300) {
            this.netArr.splice(300,1)
            this.netArr.splice(0,1)
        }
        this.netArr.push(perc)
    }

}
