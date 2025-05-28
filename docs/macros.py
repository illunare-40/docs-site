"""
📝 illunare 4.0 Enterprise Platform - MkDocs Macros
Custom macros for enhanced documentation functionality
"""

import datetime
import json
import os
from pathlib import Path

def define_env(env):
    """
    Define the macro environment
    """
    
    @env.macro
    def enterprise_badge(text, type="primary"):
        """Create an enterprise badge"""
        colors = {
            "primary": "#3f51b5",
            "success": "#4caf50", 
            "warning": "#ff9800",
            "error": "#f44336",
            "info": "#00bcd4"
        }
        color = colors.get(type, colors["primary"])
        return f'<span class="badge" style="background-color: {color}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: 600;">{text}</span>'
    
    @env.macro
    def service_status(status):
        """Display service status with appropriate styling"""
        statuses = {
            "active": ("🟢", "Active", "#4caf50"),
            "development": ("🟡", "In Development", "#ff9800"), 
            "planned": ("🔵", "Planned", "#2196f3"),
            "deprecated": ("🔴", "Deprecated", "#f44336"),
            "beta": ("🟠", "Beta", "#ff5722")
        }
        
        if status in statuses:
            icon, text, color = statuses[status]
            return f'{icon} <span style="color: {color}; font-weight: 600;">{text}</span>'
        return status
    
    @env.macro
    def tech_stack(technologies):
        """Display technology stack as badges"""
        tech_colors = {
            "go": "#00ADD8",
            "rust": "#CE422B", 
            "python": "#3776AB",
            "typescript": "#3178C6",
            "react": "#61DAFB",
            "flutter": "#02569B",
            "docker": "#2496ED",
            "kubernetes": "#326CE5",
            "terraform": "#623CE4",
            "gcp": "#4285F4"
        }
        
        badges = []
        for tech in technologies:
            color = tech_colors.get(tech.lower(), "#6c757d")
            badges.append(f'<span class="tech-badge" style="background-color: {color}; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.75em; margin-right: 4px;">{tech}</span>')
        
        return ' '.join(badges)
    
    @env.macro
    def api_endpoint(method, path, description=""):
        """Format API endpoint documentation"""
        method_colors = {
            "GET": "#28a745",
            "POST": "#007bff", 
            "PUT": "#ffc107",
            "DELETE": "#dc3545",
            "PATCH": "#6f42c1"
        }
        
        color = method_colors.get(method.upper(), "#6c757d")
        
        html = f'''
        <div class="api-endpoint" style="border: 1px solid #e9ecef; border-radius: 6px; padding: 12px; margin: 8px 0; background-color: #f8f9fa;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span class="method-badge" style="background-color: {color}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8em;">{method.upper()}</span>
                <code style="background-color: #e9ecef; padding: 4px 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace;">{path}</code>
            </div>
        '''
        
        if description:
            html += f'<p style="margin: 8px 0 0 0; color: #6c757d; font-size: 0.9em;">{description}</p>'
        
        html += '</div>'
        return html
    
    @env.macro 
    def compliance_badge(standard):
        """Display compliance badges"""
        compliance_info = {
            "LGPD": ("🇧🇷", "LGPD Compliant", "#28a745"),
            "FENSEG": ("🏛️", "FenSeg", "#007bff"),
            "SUSEP": ("⚖️", "SUSEP", "#6f42c1"),
            "SOC2": ("🔒", "SOC 2", "#dc3545"),
            "ISO27001": ("🛡️", "ISO 27001", "#fd7e14"),
            "HIPAA": ("🏥", "HIPAA", "#20c997")
        }
        
        if standard in compliance_info:
            icon, text, color = compliance_info[standard]
            return f'{icon} <span style="background-color: {color}; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.8em; font-weight: 600;">{text}</span>'
        return standard
    
    @env.macro
    def architecture_diagram(title, components):
        """Generate simple architecture diagram"""
        html = f'<div class="architecture-diagram" style="border: 2px solid #3f51b5; border-radius: 8px; padding: 16px; margin: 16px 0; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">'
        html += f'<h4 style="margin-top: 0; color: #3f51b5; text-align: center;">{title}</h4>'
        html += '<div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 8px;">'
        
        for component in components:
            html += f'<div style="background-color: white; border: 1px solid #dee2e6; border-radius: 6px; padding: 8px 12px; text-align: center; min-width: 100px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">{component}</div>'
        
        html += '</div></div>'
        return html
    
    @env.macro
    def current_date():
        """Get current date"""
        return datetime.datetime.now().strftime("%B %d, %Y")
    
    @env.macro
    def current_year():
        """Get current year"""
        return datetime.datetime.now().year
    
    @env.macro
    def platform_version():
        """Get platform version"""
        return "4.0.0"
    
    @env.macro
    def repository_count():
        """Get repository count"""
        return "175+"
    
    @env.macro
    def supported_languages():
        """Get supported programming languages"""
        return ["Go", "Rust", "Python", "TypeScript", "Elixir", "Java", "Dart"]
    
    @env.macro
    def supported_regions():
        """Get supported regions"""
        return ["Brazil", "LATAM", "North America", "Europe", "Asia-Pacific"]
    
    @env.macro
    def info_box(content, type="info"):
        """Create an information box"""
        box_styles = {
            "info": ("ℹ️", "#e3f2fd", "#1976d2"),
            "warning": ("⚠️", "#fff3e0", "#f57c00"),
            "success": ("✅", "#e8f5e8", "#388e3c"),
            "error": ("❌", "#ffebee", "#d32f2f"),
            "tip": ("💡", "#f3e5f5", "#7b1fa2")
        }
        
        icon, bg_color, border_color = box_styles.get(type, box_styles["info"])
        
        return f'''
        <div class="info-box" style="
            background-color: {bg_color}; 
            border-left: 4px solid {border_color}; 
            padding: 16px; 
            margin: 16px 0; 
            border-radius: 4px;
        ">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
                <span style="font-size: 1.2em;">{icon}</span>
                <div>{content}</div>
            </div>
        </div>
        '''
    
    @env.macro
    def feature_matrix(features):
        """Create a feature comparison matrix"""
        html = '<div class="feature-matrix" style="overflow-x: auto; margin: 16px 0;">'
        html += '<table style="width: 100%; border-collapse: collapse; border: 1px solid #dee2e6;">'
        
        # Header
        html += '<thead><tr style="background-color: #3f51b5; color: white;">'
        html += '<th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Feature</th>'
        html += '<th style="padding: 12px; text-align: center; border: 1px solid #dee2e6;">Status</th>'
        html += '<th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Description</th>'
        html += '</tr></thead><tbody>'
        
        # Rows
        for feature in features:
            name = feature.get('name', '')
            status = feature.get('status', 'unknown')
            description = feature.get('description', '')
            
            status_icon = "✅" if status == "available" else "🚧" if status == "development" else "📋"
            
            html += f'<tr style="border-bottom: 1px solid #dee2e6;">'
            html += f'<td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 600;">{name}</td>'
            html += f'<td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">{status_icon}</td>'
            html += f'<td style="padding: 12px; border: 1px solid #dee2e6;">{description}</td>'
            html += '</tr>'
        
        html += '</tbody></table></div>'
        return html
    
    # Add environment variables
    env.variables.update({
        'platform_name': 'illunare 4.0 Enterprise Platform',
        'current_version': '4.0.0',
        'build_date': datetime.datetime.now().strftime("%Y-%m-%d"),
        'documentation_url': 'https://illunare-40.github.io/docs-site/',
        'github_org': 'illunare-40',
        'support_email': 'support@illunare.com'
    }) 