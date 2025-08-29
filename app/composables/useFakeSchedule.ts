export default function() {
    const groups = ['SVSL', 'FTEL', 'SoB'];
    const hosts = ['Giki Chomusuke', 'Kai Dazkar', 'Somebody Else', 'Fourth Name'];
    const runs = [
        {
            id: "newbie",
            name: "Newbie",
            color_hex: "#22c55e" // green
        },
        {
            id: "boss2",
            name: "Boss2 Prog",
            color_hex: "#ef4444" // red
        },
        {
            id: "boss3",
            name: "Boss3 Prog",
            color_hex: "#3b82f6" // blue
        },
        {
            id: "boss4",
            name: "Boss4 Prog",
            color_hex: "#f97316" // orange
        },
        {
            id: "kill",
            name: "Kill",
            color_hex: "#eab308" // yellow
        },
        {
            id: "reclear",
            name: "Reclear",
            color_hex: "#ec4899" // pink
        },
        {
            id: "marathon",
            name: "Marathon",
            color_hex: "#8b5cf6" // purple
        }
    ]

    function generateSchedule(id: string, group_id: string = '1'){
        return {
            "id": id,
            "group": {
                "id": group_id,
                "name": groups[Math.floor(Math.random() * groups.length)],
                "private_path": "string",
                "owner": {
                    "id": "string",
                    "discord_id": "string",
                    "username": "string",
                    "handle": "string",
                    "avatar_url": "string",
                    "email": "string",
                    "bot_notifications": "string"
                },
                "members": [
                    {
                        "id": "string",
                        "discord_id": "string",
                        "username": "string",
                        "handle": "string",
                        "avatar_url": "string",
                        "email": "string",
                        "bot_notifications": "string"
                    }
                ],
                "deleted_at": "deleted_at"
            },
            "host": {
                "id": "string",
                "discord_id": "string",
                "username": hosts[Math.floor(Math.random() * hosts.length)],
                "handle": "string",
                "avatar_url": "string",
                "email": "string",
                "bot_notifications": "string"
            },
            "type": runs[Math.floor(Math.random() * runs.length)],
            "public": "string",
            "date": "string",
            "time": "18:00 ST",
            "description": "This is quite the description for this run",
            "registration_open": Math.random() < 0.5,
            "registration_deadline": "string",
            "slots": "48",
            "deleted_at": "string"
        }
    }

    return {
        generateSchedule
    };
}