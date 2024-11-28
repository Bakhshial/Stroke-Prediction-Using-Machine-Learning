# Stroke Prediction Using Machine Learning

This repository contains a comprehensive machine learning project to predict the likelihood of a stroke based on health-related attributes. The project includes data preprocessing, exploratory data analysis (EDA), feature engineering, model training, evaluation, and deployment using Flask. The goal is to build an accurate and interpretable model while addressing challenges such as class imbalance and feature encoding.

### Project Overview
Stroke is a leading cause of death and disability worldwide. Early prediction can enable preventive measures and timely medical attention. This project uses supervised learning algorithms to predict the risk of stroke in individuals using health and demographic data.

### Key Features

#### 1. Data Preparation
Dataset: Health-related attributes such as age, BMI, glucose levels, and smoking status were utilized.

Preprocessing: Handled missing values, performed one-hot and ordinal encoding, and scaled numerical features.

Imbalanced Data Handling: Applied SMOTE (Synthetic Minority Oversampling Technique) to address the imbalance in stroke cases.

#### 2. Exploratory Data Analysis (EDA)

    Visualized numerical and categorical data distributions.
    Explored correlations between features and the target variable.
    Detected and treated outliers using the IQR method.
    
#### 3. Model Training and Evaluation
Trained multiple machine learning models, including:

      Logistic Regression
      Random Forest
      Gradient Boosting
      Decision Tree
      Support Vector Machine (SVM)
      K-Nearest Neighbors (KNN)
      Naive Bayes
      Evaluated models using metrics such as accuracy, precision, recall, F1-score, and ROC-AUC.
      Used Voting Classifiers (Hard and Soft) for ensemble predictions.
#### 5. Confusion Matrices and ROC Curves
Plotted confusion matrices for all models to visualize performance.

Combined ROC curves to compare the models' true positive and false positive rates.
