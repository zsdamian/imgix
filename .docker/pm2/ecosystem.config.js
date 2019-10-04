module.exports = {
    apps: [
        {
            name: "imgix",
            script: "/home/wwwroot/app/imgix/imgix.py",
            max_memory_restart: "300M"
        },
        {
            name: "php_consumer",
            script: "/home/wwwroot/app/server/bin/console",
            args: "rabbitmq:consumer image_ready",
            interpreter: "php",
            max_memory_restart: "300M"
        }
    ]
};