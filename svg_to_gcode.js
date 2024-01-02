function convertSVGToGCode() {
    const svgFile = document.getElementById('svgFile').files[0];
    const startCmd = document.getElementById('startCmd').value;
    const endCmd = document.getElementById('endCmd').value;
    const offCmd = document.getElementById('offCmd').value;
    const onCmd = document.getElementById('onCmd').value;
    const feedRate = document.getElementById('feedRate').value;
    
    if (svgFile) {
        const reader = new FileReader();
        reader.readAsText(svgFile);
        reader.onload = function(e) {
            const svgText = e.target.result;
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

            let gCode = startCmd + "\n";

            // Function to process paths
            function processPath(path) {
                const pathSegList = path.pathSegList;
                
                for (let i = 0; i < pathSegList.numberOfItems; i++) {
                    const seg = pathSegList.getItem(i);
                    switch (seg.pathSegTypeAsLetter) {
                        case 'M':
                        case 'm':
                            gCode += offCmd + "\n";
                            gCode += `G0 X${seg.x} Y${seg.y} F${feedRate}\n`;
                            gCode += onCmd + "\n";
                            break;
                        case 'L':
                        case 'l':
                            gCode += `G1 X${seg.x} Y${seg.y} F${feedRate}\n`;
                            break;
                        // Add more cases for other segment types if necessary
                        default:
                            // Handle unsupported segment types or log an error
                            console.log("Unsupported segment type: " + seg.pathSegTypeAsLetter);
                            break;
                    }
                }
            }

            // Process each path in the SVG
            const paths = svgDoc.querySelectorAll('path');
            paths.forEach(processPath);

            // If there are group elements, process paths within each group
            const groups = svgDoc.querySelectorAll('g');
            groups.forEach(group => {
                group.querySelectorAll('path').forEach(processPath);
            });

            gCode += endCmd;
            document.getElementById('gcodeOutput').value = gCode;
        };
    }
}
