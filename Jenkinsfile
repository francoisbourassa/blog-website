pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/francoisbourassa/blog-website', credentialsId: 'github-credentials']]])
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh './node_modules/.bin/mocha --reporter mocha-junit-reporter --reporter-options mochaFile=./test-results/results.xml \'test/**/*.js\''
            }
        }

        stage('Publish test results') {
            steps {
                junit 'test-results/results.xml'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/*.xml', allowEmptyArchive: true
            junit 'test-results/results.xml'
        }
        failure {
            mail to: 'you@example.com',
                 subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                 body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}
