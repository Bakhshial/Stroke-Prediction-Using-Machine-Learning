from flask import Flask, jsonify, request
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)  # Enable CORS for all routes

# Load the saved model
model_data = joblib.load('model_rf.joblib')
final_model = model_data['model']
preprocessor = model_data['preprocessor']
encoded_cols = model_data['encoded_cols']
numeric_cols = model_data['numeric_cols']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the front end
        input_data = request.json  # Expect JSON input
        
        # Create a DataFrame for the input
        input_df = pd.DataFrame([input_data])
        
        # Preprocess the input
        input_transformed = preprocessor.transform(input_df)
        input_transformed_df = pd.DataFrame(input_transformed, columns=encoded_cols)

        # Add numeric columns back
        for col in numeric_cols:
            input_transformed_df[col] = input_df[col].values

        # Align with the trained model features
        input_transformed_df = input_transformed_df[final_model.feature_names_in_]

        # Make predictions
        prediction = final_model.predict(input_transformed_df)
        probabilities = final_model.predict_proba(input_transformed_df).tolist()

        # Send response to front end
        return jsonify({
            'prediction': int(prediction[0]),
            'probabilities': probabilities
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
