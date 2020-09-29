import axios from "axios";

const AXIOS = axios.create({
    baseURL: "https://designer-app-rapidash.herokuapp.com/api",
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }
});

const state = {
    active: true,
    activeProject: 1,
    activeSection: 2,
    projectRooms: new Map(),
    activeRoom: 1,
    projectInfo: [],
};

const getters = {
    getProjects: state => {
        return state.projectInfo;
    },
    getActiveProject: state => {
        return state.activeProject;
    },
    getActiveSection: state => {
        return state.activeSection;
    },
    getActiveRoom: state => {
        return state.activeRoom;
    },
    getActiveToolBar: state => {
        return state.active;
    },
};

const mutations = {
    changeRoom: (state, payload) => {
        state.activeRoom = payload;
    },
    toggleRightPanel: (state) => {
        state.active = !state.active;
    },
    changeSection: (state, payload) => {
        state.activeSection = payload;
    },
    changeActiveProject: (state, payload) => {
        state.activeProject = payload;
    },
    setProjectInfo: (state, payload) => {
        state.projectInfo = payload;
    },
    setProjectRoom: (state, payload) => {
        state.projectRoomse = payload;
    },
};

const actions = {
    changeRoom: (context, payload)  => {
        context.commit("changeRoom", payload);
    },
    toggleRightPanel: (context)  => {
        context.commit("toggleRightPanel");
    },
    changeSection: (context, payload)  => {
        context.commit("changeSection", payload);
    },
    changeActiveProject: (context, payload)  => {
        context.commit("changeActiveProject", payload);
    },
    setInitialValue: async context => {
        let rooms = new Map();
        await AXIOS.get("/room")
            .then(res => {
                res.data.forEach(function(room){
                    rooms.set(room.id, room);
                    console.log(room);
                });
            });

        let sketches = new Map();
        await AXIOS.get("/sketches")
            .then(res => {
                res.data.forEach(function(sketch){
                    sketches.set(sketch.id, sketch);
                });
            });

        let characteristics = new Map();
        await AXIOS.get("/main_characteristic")
            .then(res => {
                res.data.forEach(function(characteristic){
                    characteristics.set(characteristic.id, characteristic);
                });
            });

        let materials = new Map();
        await AXIOS.get("/decoration_material")
            .then(res => {
                res.data.forEach(function(material){
                    materials.set(material.id, material);
                    console.log(material);
                });
            });

        let projects = [];
        let projectRoom = new Map();
        await AXIOS.get("/project")
            .then(res => {
                res.data.forEach(function(item) {
                    projects.push({
                        name:item.name,
                        rooms: []
                    })
                    let project = projects[projects.length - 1];
                    item.rooms.forEach(function(id){
                        let room = rooms.get(id);
                        project.rooms.push({
                            id: id,
                            name: room.name,
                            sketches:[],
                            materials: [],
                            characteristics: []
                        })
                        room.sketches.forEach(function(id) {
                            project.rooms[project.rooms.length - 1].sketches.push(sketches.get(id));
                        });
                        room.decoration_materials.forEach(function(id) {
                            project.rooms[project.rooms.length - 1].materials.push(materials.get(id));
                        });
                        room.main_characteristics.forEach(function(id) {
                            project.rooms[project.rooms.length - 1].characteristics.push(characteristics.get(id));
                        });
                        projectRoom.set(id, project.rooms[project.rooms.length - 1]);
                    })
                });
                context.commit("setProjectInfo", projects);
                context.commit("setProjectRoom", projectRoom);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
