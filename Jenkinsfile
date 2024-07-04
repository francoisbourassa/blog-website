pipeline {
    agent any
    environment {
        GIT_CREDENTIALS_ID = 'github-credentials' // Remplacez par l'ID des informations d'identification Jenkins
    }
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.GIT_CREDENTIALS_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        sh 'git config --global http.sslVerify false'
                        sh 'git config --global core.askPass /bin/true'
                        sh 'git clone https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/francoisbourassa/blog-website.git'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    dir('blog-website') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    dir('blog-website') {
                        sh 'npm test'
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                dir('blog-website') {
                    junit 'path/to/your/test-results/*.xml' // Remplacez par le chemin réel vers vos résultats de test
                }
            }
        }
    }
}
