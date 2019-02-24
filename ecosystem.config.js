module.exports = {
    apps: [
        {
            name: 'index-web',
            script: './server/index.js',
            // watch: 파일이 변경되면 서버가 자동으로 재시작
            watch: false,
            exec_mode: 'cluster',
            instances: 'max',
            // merge_logs: 실행 모드가 cluster 일 때 로그를 한 파일에 저장
            merge_logs: true,
            env: {
                'NODE_ENV': 'production',
            },
        },
    ],
}