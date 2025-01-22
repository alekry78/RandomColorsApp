import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
export default function HomeScreen() {
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [textColor, setTextColor] = useState('#000000');
    const generateRandomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }
    const getOppositeColor = (rgbString: string) => {
        const regex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
        const result = rgbString.match(regex);
        // In case input was invalid or didn't match the expected pattern
        if (!result) {
            // default fallback
            return 'rgb(255, 255, 255)';
        }
        // Extract channels
        const red = parseInt(result[1], 10);
        const green = parseInt(result[2], 10);
        const blue = parseInt(result[3], 10);

        // Invert each channel
        const invertedRed = 255 - red;
        const invertedGreen = 255 - green;
        const invertedBlue = 255 - blue;

        return `rgb(${invertedRed}, ${invertedGreen}, ${invertedBlue})`;
    }
    const handleScreenPress = () => {
        const newColor = generateRandomColor();
        const newTextColor = getOppositeColor(newColor);
        setBackgroundColor(newColor);
        setTextColor(newTextColor);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    const showToast = () => {
        ToastAndroid.show('Color copied to clipboard!', ToastAndroid.SHORT);
    };
    const handleCopyToClipboard = async () => {
        await Clipboard.getStringAsync()
            .then(() => {
                showToast();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            })
    }

    return (
        <TouchableOpacity style={[styles.screenContainer, {backgroundColor}]} activeOpacity={0.8} onPress={handleScreenPress}>
            <StatusBar style="dark"/>
            <View style={styles.textContainer}>
                <Text style={[styles.helloText, {color: textColor}]}>Hello there</Text>
                <Text style={[styles.text, {color: textColor}]}>Press the background to change color</Text>
                <Text style={[styles.text, {color: textColor}]}>Press the color text to copy to clipboard</Text>
                <TouchableOpacity style={styles.colorsContainer} activeOpacity={0.6} onPress={handleCopyToClipboard}>
                    <Text style={[styles.text, {color: textColor}]}>Background Color:</Text>
                    <Text style={[styles.text, {color: textColor}]}>
                        {backgroundColor}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.colorsContainer} activeOpacity={0.6} onPress={handleCopyToClipboard}>
                    <Text style={[styles.text, {color: textColor}]}>Text Color:</Text>
                    <Text style={[styles.text, {color: textColor}]}>
                        {textColor}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        alignItems: 'center'
    },
    helloText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 18,
    },
    colorsContainer: {
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
